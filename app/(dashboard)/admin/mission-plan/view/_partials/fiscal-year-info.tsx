import { Dictionary } from '@/@types/dictionary';
import { useAppSelector } from '@/redux/store';
import React from 'react';

const FiscalYearInfo = () => {
    const { active_fy_info } = useAppSelector((state) => state?.mission_plan?.mission_plan)
    
    return (
        <div className="space-y-5 mb-6 px-5 text-[var(--text-color3)]">
            {/* Financial Year */}
            <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                <h3 className="text-sm font-normal ">1. Financial Year</h3>
                <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
                    {/* Title */}
                    <div className="col-span-4 space-y-2">
                        <h4 className="text-[var(--text-color4)] font-light text-sm">
                            Title
                        </h4>
                        <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                            {active_fy_info?.title}
                        </p>
                    </div>
                    {/* Start Period */}
                    <div className="col-span-3 space-y-2">
                        <h4 className="text-[var(--text-color4)] font-light text-sm">
                            Start Period
                        </h4>
                        <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                            {active_fy_info?.start_date}
                        </p>
                    </div>
                    {/* End Period */}
                    <div className="col-span-3 space-y-2">
                        <h4 className="text-[var(--text-color4)] font-light text-sm">
                            End Period
                        </h4>
                        <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                            {active_fy_info?.end_date}
                        </p>
                    </div>
                </div>
            </div>
            <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
                <div className="space-y-7 mt-4 max-w-4xl">
                    {/* Mission */}
                    <div className="space-y-2">
                        <h4 className="text-[var(--text-color4)] font-light text-sm">
                            Mission
                        </h4>
                        <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                            {active_fy_info?.mission}
                        </p>
                    </div>
                    {/* Vision */}
                    <div className="space-y-2">
                        <h4 className="text-[var(--text-color4)] font-light text-sm">
                            Vision
                        </h4>
                        <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                            {active_fy_info?.vision}
                        </p>
                    </div>
                </div>
            </div>
            <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
                <div className="mt-4 max-w-lg">
                    {/* Pillar 1 */}
                    {
                        active_fy_info?.strategic_pillars?.map((item: Dictionary, idx: number) => (
                            <div className="mb-6" key={idx}>
                                <h4 className="text-[var(--text-color4)] font-light text-sm">
                                    Pillar {idx + 1}
                                </h4>
                                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                    {item?.title}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FiscalYearInfo;
