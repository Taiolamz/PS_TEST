import { Dictionary } from "@/@types/dictionary";
import CustomSelect from "@/components/custom-select";
import { AchievementProgress, CardContainer, Legend, PercentageLabel, ReusableLabel, ReusableSegmentProgress, SingleExcutiveProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { getProgressColorByValue } from '@/utils/helpers';
import { ArrowRight, Filter } from "iconsax-react";
import { Undo2 } from "lucide-react";
import { ACHIEVEMENT_PROGRESS_DATA, MOS_LABEL_TYPES, PAGE_LEGEND, SPECIFIED_TASK_CHART_LABELS } from "../_data";

const OrganizationReports = () => {
    return (
        <div className="w-full">
        <CardContainer className="mt-6">
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center w-fit gap-1 text-sm"> <span>Filter</span> <Filter width={18} height={18} /></div>
                <div className="w-full flex flex-wrap items-center gap-3">
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Zojatech', value: 'Zojatech' },
                        ]}
                        placeholder="Select Subsidiary"
                        selected=""
                        setSelected={() => null}
                        className="w-[11rem]"
                    />
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Zojatech Uk', value: 'Zojatech Uk' },
                        ]}
                        placeholder="Select Branch"
                        selected=""
                        setSelected={() => null}
                        className="w-[9rem]"
                    />
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Products', value: 'Finance' },
                        ]}
                        placeholder="Select Department"
                        selected=""
                        setSelected={() => null}
                        className="w-[11rem]"
                    />
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Products', value: 'Finance' },
                        ]}
                        placeholder="Select Unit"
                        selected=""
                        setSelected={() => null}
                        className="w-[8rem]"
                    />
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Products', value: 'Finance' },
                        ]}
                        placeholder="Select FY"
                        selected=""
                        setSelected={() => null}
                        className="w-[8rem]"
                    />
                    <CustomSelect
                        options={[
                            { label: 'All', value: 'All' },
                            { label: 'Products', value: 'Finance' },
                        ]}
                        placeholder="Select Cycle"
                        selected=""
                        setSelected={() => null}
                        className="w-[9rem]"
                    />
                    <div className="flex items-center w-fit gap-1 text-sm text-red-500"> <span>Reset</span> <Undo2 width={18} height={18} /></div>
                </div>
            </div>
            <div className="mt-3 flex justify-end">
                <Button
                    className="px-6"
                >Apply</Button>
            </div>
        </CardContainer>

        <div className="mt-6 flex justify-end">
            <Button
                className="px-6 text-gray-400 hover:text-gray-500"
                variant="outline"
            >Generate Performance Report</Button>
        </div>
        <CardContainer className="mt-3 gap-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1>Organization Task Completion, FY2024</h1>
                    <span className="text-xs text-gray-400 font-light">March 2023 - March 31, 2024</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 font-light">Organization Mission Plan Progress</span>
                    <PercentageLabel color="red" value={43} />
                </div>
            </div>
            <div className="my-6">
                <ReusableSegmentProgress
                    value={50}
                    segments={[
                        { percentage: 20, color: "#00a699" },
                        { percentage: 30, color: "#6a00ff" },
                        { percentage: 50, color: "#0052cc" },
                    ]}
                    height={10}
                    borderRadius={2}
                />
                <div className="mt-6 flex items-center justify-between w-[90%]">
                    <div className="flex">
                        <div className="pt-10 flex flex-col">
                            <span className="font-light">Specified Task Activity Breakdown</span>
                            <span className="mt-2 block text-[14px] font-medium !text-[var(--primary-color)]">Click here to see All Tasks</span>
                        </div>
                        {/* <SpecifiedTaskChart /> */}
                    </div>
                    <div className="">
                        <ReusableLabel title="Total" value="40 Specified Tasks" />
                        <div className="mt-4 flex flex-col gap-4">
                            {
                                SPECIFIED_TASK_CHART_LABELS?.map((item: Dictionary) => (
                                    <Legend key={item?.title} title={item?.title} value={item?.value} color={item?.color as any} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </CardContainer>

        <CardContainer className="mt-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1>Organization Measure of Success</h1>
                    <PercentageLabel color="yellow" value={52} label="Archieved" />
                </div>
                <Button><span>See Details</span> <ArrowRight /> </Button>
            </div>
            <div className="my-6">
                <div className="w-2/3 flex gap-3">
                    <div className="w-fit">
                        <Legend title="Target" color="purple" />
                    </div>
                    <div className="border rounded-sm flex gap-4 p-1">
                        {
                            MOS_LABEL_TYPES?.map((item: Dictionary) => (
                                <Legend key={item?.title} title={item?.title} color={item?.color as any} barWidth={20} titleClass="text-xs" />
                            ))
                        }
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    {
                        ACHIEVEMENT_PROGRESS_DATA?.map((item: Dictionary) => (
                            <AchievementProgress
                                key={item?.title}
                                title="Revenue"
                                progress_value={item?.progress}
                                color={getProgressColorByValue(item?.progress)}
                                target={item?.target}
                                targetColor={item?.targetColor}
                            />
                        ))
                    }
                </div>
            </div>
        </CardContainer>

        <CardContainer className="mt-6 p-0">
            <div className="border-b p-5">
                <h1>Top Level Executive Mission Plan Progress</h1>
            </div>
            <div className="p-5">
                <SingleExcutiveProgress
                    name="Joseph Oloyede"
                    position="Head of Subsidiary (Zojatech)"
                    onClick={() => null}
                    progress={30}
                />
            </div>
        </CardContainer>

        <CardContainer className="mt-6">
            <div className="flex items-center gap-4 w-[80%] mx-auto">
                <span className="w-fit text-sm text-gray-500">Page Legend</span>
                <div className="flex gap-8">
                    {
                        PAGE_LEGEND?.map((item: Dictionary) => (
                            <Legend key={item?.title} title={item?.title} color={item?.color as any} barHeight={4} barWidth={40} titleClass="text-xs" titleColor="default"/>
                        ))
                    }
                    <div className="w-fit flex items-center gap-2 text-gray-500">
                        <ReusableSegmentProgress
                            value={100}
                            segments={[
                                { percentage: 20, color: "#00a699" },
                                { percentage: 60, color: "#6a00ff" },
                                { percentage: 20, color: "#0052cc" },
                            ]}
                            borderRadius={1}
                            width={3}
                            height={5}
                        />
                        <span className="text-xs">Progress</span>
                    </div>
                </div>

            </div>
        </CardContainer>
    </div>
    );
}

export default OrganizationReports;
