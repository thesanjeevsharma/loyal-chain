import React from "react";

type Props = {
  label: string;
  value: string;
};

const Stats = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-lg text-neutral-400">{label}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Stats;
