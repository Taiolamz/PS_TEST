interface prop {
  children: React.ReactNode;
}
const MissionPlanWrapper = ({ children }: prop) => {
  return <div className="flex flex-col gap-[10px] select-none">{children}</div>;
};

export default MissionPlanWrapper