import React from "react";

interface BonusCondition {
  id: string;
  description: string;
  completed: boolean;
}

interface Props {
  conditions: BonusCondition[];
}

const BonusConditions: React.FC<Props> = ({ conditions }) => {
  return (
    <div className="space-y-2">
      {conditions.map((cond) => (
        <div key={cond.id} className="flex items-center space-x-2">
          <span className={cond.completed ? "text-green-600" : "text-gray-400"}>
            {cond.completed ? "✅" : "⬜"}
          </span>
          <p>{cond.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BonusConditions;
