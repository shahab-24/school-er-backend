"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSheetService = void 0;
const resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
/**
 * Dense ranking:
 * totals sorted desc
 * equal totals => same position
 * next position increments by count of previous uniques
 */
function assignPositions(sorted) {
    let pos = 0;
    let lastTotal = null;
    let rank = 0;
    const map = new Map();
    for (const item of sorted) {
        if (lastTotal === null || item.total < lastTotal) {
            rank += 1;
            pos = rank;
            lastTotal = item.total;
        }
        map.set(item.studentId, pos);
    }
    return map;
}
exports.ResultSheetService = {
    async generate(query) {
        const q = {
            scope: query.scope,
            session: query.session,
            class: query.class,
        };
        if (query.scope === "terminal")
            q.terminalKey = query.terminalKey;
        // fetch snapshots (immutable)
        const snaps = await resultSnapshot_model_1.ResultSnapshot.find(q)
            .select("studentId total percentage failed")
            .lean();
        if (!snaps.length) {
            return {
                session: query.session,
                class: query.class,
                scope: query.scope,
                terminalKey: query.terminalKey,
                rows: [],
            };
        }
        // sort by total desc, then percentage desc (stable tie-breaker)
        const sorted = [...snaps].sort((a, b) => {
            if (b.total !== a.total)
                return b.total - a.total;
            return b.percentage - a.percentage;
        });
        // assign positions (dense ranking)
        const posMap = assignPositions(sorted.map((s) => ({ studentId: s.studentId, total: s.total })));
        const rows = sorted.map((s) => ({
            studentId: s.studentId,
            total: s.total,
            percentage: Number(s.percentage.toFixed(2)),
            position: posMap.get(s.studentId),
            failed: !!s.failed,
        }));
        return {
            session: query.session,
            class: query.class,
            scope: query.scope,
            terminalKey: query.terminalKey,
            rows,
        };
    },
    /**
     * Annual sheet with previous terminal comparison (optional).
     * Provide previous scope/key to enrich rows.
     */
    async generateWithPrevious(current, previous) {
        const currentSheet = await this.generate(current);
        // index previous positions
        const prevSnaps = await resultSnapshot_model_1.ResultSnapshot.find({
            scope: previous.scope,
            terminalKey: previous.terminalKey,
            session: previous.session,
            class: previous.class,
        })
            .select("studentId total percentage")
            .lean();
        const prevSorted = [...prevSnaps].sort((a, b) => {
            if (b.total !== a.total)
                return b.total - a.total;
            return b.percentage - a.percentage;
        });
        const prevPosMap = assignPositions(prevSorted.map((s) => ({ studentId: s.studentId, total: s.total })));
        currentSheet.rows = currentSheet.rows.map((r) => ({
            ...r,
            previous: prevPosMap.has(r.studentId)
                ? { class: previous.class, position: prevPosMap.get(r.studentId) }
                : undefined,
        }));
        return currentSheet;
    },
};
//# sourceMappingURL=resultSheet.service.js.map