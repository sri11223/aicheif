import React from "react";
import { BudgetSnapshot } from "../../types/dashboard";

interface BudgetChartProps {
  budgets: BudgetSnapshot[];
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ budgets }) => {
  return (
    <div className="budget-chart">
      {budgets.map((budget) => {
        const percent = Math.min(100, Math.round((budget.spent / budget.budget) * 100));
        return (
          <div key={budget.id} className="budget-row">
            <div className="budget-labels">
              <span>{budget.month}</span>
              <span>
                ${budget.spent} / ${budget.budget}
              </span>
            </div>
            <div className="budget-bar">
              <div className="budget-bar-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="tag">{budget.variance}% variance</span>
          </div>
        );
      })}
    </div>
  );
};
