// interface missionItems {
//     title: string;
//     behaviours: string;
//     intent: string;
//     description: [
//       {
//         key: string;
//         value: string;
//       }
//     ];
//   }
//   interface dataProp {
//     data?: any;
//     strategicIntent?: boolean;
//     strategicIntentData?: any[];
//     specifiedTasks?: boolean;
//     specifiedTasksData?: any[];
//   }
  
//   const  pecifiedTasksData = [
//     {
//       title: "Strategic Intent 1",
//       intent:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry., ",
//       behaviours: "simply dummy text of the printing",
//     },
//     {
//       title: "Strategic Intent 1",
//       intent:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry., ",
//       behaviours: "simply dummy text of the printing",
//     },
//   ];
  
//   const MissionItems = ({
//     data,
//     strategicIntent,
//     strategicIntentData,
//     specifiedTasks,
//     specifiedTasksData,
//   }: dataProp) => {
//     return (
//       <div className="w-full">
//         {data?.map(({ title, description }: missionItems, index: string) => {
//           return (
//             <div key={index} className="text-[var(--text-secondary)] text-sm">
//               <div className="text-sm font-normal leading-relaxed">
//                 <h4>- {title}</h4>
//               </div>
//               <div className="gap-[5px] flex flex-col pt-[5px]">
//                 {description !== undefined &&
//                   description.map(({ key, value }, index) => {
//                     return (
//                       <div className="pl-[1rem] leading-relaxed " key={index}>
//                         <p className="flex gap-[5px] leading-relaxed text-sm">
//                           <span className="font-[400]">
//                             {key}
//                             {index + 1 !== description.length ? (
//                               <span> : </span>
//                             ) : (
//                               ""
//                             )}
//                           </span>
//                           <span className="font-[300]">{value}</span>
//                         </p>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           );
//         })}
//         {strategicIntent ? (
//           <div className="flex flex-col gap-3">
//             {strategicIntentData?.map((chi, idx) => {
//               const { title, intent, behaviours } = chi;
//               const formattedBehaviours = JSON.parse(behaviours as string).join(
//                 ", "
//               );
  
//               return (
//                 <div key={idx} className="flex flex-col gap-1">
//                   <p className="text-primary font-medium">{`- Strategic Intent ${
//                     idx + 1
//                   }`}</p>
  
//                   <div className="flex gap-[5px] items-center mt-2">
//                     <p className="font-[400]">Intent :</p>
//                     <p className="text-sm font-light">{intent}</p>
//                   </div>
//                   <div className="flex gap-[5px] items-center">
//                     <p className="font-[400]">Behaviours :</p>
//                     <p className="text-sm font-light">{formattedBehaviours}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : null}
//         {specifiedTasks ? (
//           <div className="flex flex-col gap-3">
//             {specifiedTasksData?.map((chi, idx) => {
//               const { title, intent, behaviours } = chi;
//               const formattedBehaviours = JSON.parse(behaviours as string).join(
//                 ", "
//               );
  
//               return (
//                 <div key={idx} className="flex flex-col gap-1">
//                   <p className="text-primary font-medium">{`- Strategic Intent ${
//                     idx + 1
//                   }`}</p>
  
//                   <div className="flex gap-[5px] items-center mt-2">
//                     <p className="font-[400]">Intent :</p>
//                     <p className="text-sm font-light">{intent}</p>
//                   </div>
//                   <div className="flex gap-[5px] items-center">
//                     <p className="font-[400]">Behaviours :</p>
//                     <p className="text-sm font-light">{formattedBehaviours}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : null}
  
//         {/* {strategicIntentData} */}
//       </div>
//     );
//   };
  
//   export default MissionItems;
  