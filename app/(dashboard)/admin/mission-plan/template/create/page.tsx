"use client";

import React, { useEffect, useState, DragEvent } from "react";
import { useMissionPlanTemplate } from "../_hooks/useMissionPlanTemplate";
import { Input } from "@/components/ui/input";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import { formatRMDatePicker } from "@/utils/helpers/date-formatter";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import routesPath from "@/utils/routes";
import { Button } from "@/components/ui/button";
import {
  CirclePlusIcon,
  DraggableIcon,
  TrashIcon,
} from "@/public/assets/icons";
import Image from "next/image";
import useDisclosure from "../_hooks/useDisclosure";
import MissionPlanTemplateModal from "../level/_component/mission-plan-template-modal";
import { MissionContentDetails } from "../level/_component/checklist-steps";

const { ADMIN } = routesPath;

interface Section {
  mapTitle: string;
  id: string;
  title: string;
  displayName: string;
  content: () => JSX.Element;
  isSelected?: boolean;
}

const AddMissionPlanTemplate: React.FC = () => {
  const cancelRoute = ADMIN.CHECKLIST;
  const {
    formik,
    units,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingMissionPlanTemplate,
    sections,
    setSections,
  } = useMissionPlanTemplate({ cancelPath: cancelRoute });

  const handleMissionDialog = () => {
    onOpenMissionModal();
    if (openMissionModal) {
      closeMissionModal();
    }
  };

  const [missionPlanTemplates, setMissionPlanTemplates] = useState<
    MissionContentDetails[]
  >([]);
  // const [sections, setSections] = useState<Section[]>([]);

  const handleGetMissionPlanTemplates = () => {
    const selectedMissionPlanTemplates = localStorage.getItem(
      "selected-mission-plan-template"
    );
    if (selectedMissionPlanTemplates) {
      setMissionPlanTemplates(JSON.parse(selectedMissionPlanTemplates));
    }
    if (openMissionModal) {
      handleMissionDialog();
    }
  };

  const handleIsSelectedField = () => {
    const selected = missionPlanTemplates.map((chi) => chi.isSelected);
    return selected;
  };

  const initialSections: Section[] = [
    {
      id: "1",
      title: "Financial Year",
      mapTitle: "financial_year",
      content: renderFinancialYear,
      displayName: "Name of Financial Year",
      isSelected: handleIsSelectedField()[0],
    },
    {
      id: "2",
      title: "Mission Statement",
      mapTitle: "mission_statement",
      content: renderMissionStatement,
      displayName: "Mission Statement",
      isSelected: handleIsSelectedField()[1],
    },
    {
      id: "3",
      title: "Measure of Success",
      mapTitle: "success_measures",
      content: renderMeasureOfSuccess,
      displayName: "Measure of Success",
      isSelected: handleIsSelectedField()[2],
    },
    {
      id: "4",
      title: "Implied Task",
      mapTitle:"implied_tasks",
      content: renderImpliedTask,
      displayName: "Implied Tasks",
      isSelected: handleIsSelectedField()[3],
    },
    {
      id: "5",
      title: "Specified Task",
      mapTitle:"specified_tasks",
      content: renderSpecifiedTask,
      displayName: "Specified Tasks",
      isSelected: handleIsSelectedField()[4],
    },
    {
      id: "6",
      title: "Freedom & Constraints",
      mapTitle:"boundaries",
      content: renderFreedomConstraints,
      displayName: "Freedom & Constraints",
      isSelected: handleIsSelectedField()[5],
    },
    {
      id: "7",
      title: "Set Strategic Intent",
      mapTitle: "strategic_intents",
      content: renderStrategicIntent,
      displayName: "Strategic Intent/Behaviour",
      isSelected: handleIsSelectedField()[6],
    },
    {
      id: "8",
      title: "Set Strategic Pillars",
      mapTitle: "duration",
      content: renderStrategicPillars,
      displayName: "Strategic Pillars",
      isSelected: handleIsSelectedField()[7],
    },
  ];

  useEffect(() => {
    handleGetMissionPlanTemplates();
  }, []);

  useEffect(() => {
    const filteredSections = initialSections.filter(
      (section) => section.isSelected
    );
    setSections(filteredSections);
  }, [missionPlanTemplates]);

  const headerClass = "text-custom-dark-blue font-normal text-sm";
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const newSections = [...sections];
    const [draggedItem] = newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedItem);
    setSections(newSections);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDeleteMissionTemplate = (id: string) => {
    const newTemplate = sections.filter((chi) => chi.id !== id);
    setSections(newTemplate);
    handleMissionLabelCheck(newTemplate);
    return newTemplate;
  };

  const handleMissionLabelCheck = (updatedSections: Section[]) => {
    const sectionTitles = updatedSections.map((chi) => chi.title);

    const updatedMissionPlanTemplates = missionPlanTemplates.map((item) => {
      if (!sectionTitles.includes(item.title)) {
        return { ...item, isSelected: false };
      }
      return item;
    });

    localStorage.setItem(
      "selected-mission-plan-template",
      JSON.stringify(updatedMissionPlanTemplates)
    );
    return updatedMissionPlanTemplates;
  };

  const {
    isOpen: openMissionModal,
    open: onOpenMissionModal,
    close: closeMissionModal,
  } = useDisclosure();

  function renderFinancialYear() {
    return (
      <div className="mt-2 flex w-[874px] gap-5 justify-between items-center">
        <Input
          label="Title"
          type="text"
          placeholder="2024 Financial Year"
          id="financial_year.title"
          name="financial_year.title"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
        <div className="flex gap-5 items-center">
          <CustomDateInput
            id="financial_year.start_period"
            label="Start Period"
            selected={formik.values.financial_year.start_period}
            handleChange={(date) =>
              formik.setFieldValue(
                "financial_year.start_period",
                formatRMDatePicker(date)
              )
            }
            className="relative"
            iconClass="cursor-not-allowed"
            inputClass="text-[#d3d3d3] cursor-not-allowed"
            error={""}
            disabled
          />
          <CustomDateInput
            id="financial_year.end_period"
            label="End Period"
            selected={formik.values.financial_year.end_period}
            handleChange={(date) =>
              formik.setFieldValue(
                "financial_year.end_period",
                formatRMDatePicker(date)
              )
            }
            placeholder="sdfsdf"
            error={""}
            iconClass="cursor-not-allowed"
            className="relative"
            inputClass="text-[#d3d3d3] cursor-not-allowed"
            disabled
          />
        </div>
      </div>
    );
  }

  function renderMissionStatement() {
    return (
      <div className="mt-2">
        <label htmlFor="mission_statement" className={labelClassName}>
          Set Mission Statement
        </label>
        <textarea
          placeholder="Input Mission Statement"
          id="mission_statement"
          name="mission_statement"
          onChange={formik.handleChange}
          className={`w-[874px] h-[105px] focus:outline-none rounded border focus:ring-1 focus:ring-primary p-3 pt-2 px-3 py-4 text-sm transition-colors bg-[#F6F8F9] resize-none`}
          disabled
        />
      </div>
    );
  }

  function renderMeasureOfSuccess() {
    return (
      <div className="mt-2 flex items-center gap-5">
        <Input
          label="Measure of Success 1"
          type="text"
          placeholder="Input Measure of Success"
          id="measure_of_success.measure_of_success"
          name="measure_of_success.measure_of_success"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
        <div className="flex gap-5 items-center">
          <CustomSelect
            label="Unit"
            placeholder="Select unit"
            options={units}
            selected={formik.values.success_measures.unit}
            setSelected={(value) =>
              formik.setFieldValue("measure_of_success.unit", value)
            }
            className="w-full pr-10"
            labelClass={labelClassName}
            disabled
          />
          <Input
            label="Target"
            type="text"
            placeholder="Input number"
            id="measure_of_success.target"
            name="measure_of_success.target"
            onChange={formik.handleChange}
            className="w-full"
            disabled
          />
        </div>
      </div>
    );
  }

  function renderImpliedTask() {
    return (
      <div className="mt-2 flex items-center gap-5">
        <Input
          label="Implied Task"
          type="text"
          placeholder="Implied Task"
          id="implied_tasks"
          name="implied_tasks"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
      </div>
    );
  }

  function renderSpecifiedTask() {
    return (
      <div className="mt-2 flex items-center gap-5">
        <Input
          label="Specified Task"
          type="text"
          placeholder="Input Task"
          id="specified_tasks"
          name="specified_tasks"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
      </div>
    );
  }

  function renderFreedomConstraints() {
    return (
      <div className="mt-2 flex items-center gap-5">
        <Input
          label="Constraint 1"
          type="text"
          placeholder="Input constraint"
          id="freedom_and_constraints.constraint"
          name="freedom_and_constraints.constraint"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
        <Input
          label="Freedom 1"
          type="text"
          placeholder="Input freedom"
          id="freedom_and_constraints.freedom"
          name="freedom_and_constraints.freedom"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
      </div>
    );
  }

  function renderStrategicIntent() {
    return (
      <div className="mt-2">
        <Input
          label="Strategic intent 1"
          type="text"
          placeholder="Input Intent"
          id="strategic_intent"
          name="strategic_intent"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
      </div>
    );
  }

  function renderStrategicPillars() {
    return (
      <div className="mt-2">
        <Input
          label="Strategic pillar 1"
          type="text"
          placeholder="Input pillar"
          id="strategic_pillar"
          name="strategic_pillar"
          onChange={formik.handleChange}
          className={`w-[425px]`}
          disabled
        />
      </div>
    );
  }

  console.log(sections, missionPlanTemplates, "sections checkings");

  return (
    <DashboardLayout back headerTitle="Create Mission Plan Template">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="2"
        title="Create Mission Plan Template"
        btnDisabled={!formik.isValid || !formik.dirty}
        loading={isCreatingMissionPlanTemplate}
        onSave={formik.handleSubmit}
        fixed={true}
      />
      <div style={{ padding: "0rem 2rem", marginTop: "1.5rem" }}>
        <form
          className="mt-5 max-w-full"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div>
            <div className="flex gap-5 ">
              <Input
                label="Input your template title"
                type="text"
                placeholder="C Level Mission Plan"
                id="template_title"
                name="template_title"
                onChange={formik.handleChange}
                className={`w-[425px]`}
              />

              <Button
                variant="outline"
                className="font-light mt-auto text-primary border-primary hover:bg-transparent hover:text-primary"
                disabled
              >
                Edit
              </Button>
            </div>
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="mt-5 border  rounded-lg p-8 cursor-pointer pb-10 pt-10 bg-white"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                <div className="grid relative">
                  <div className="flex flex-col gap-2">
                    <p className={headerClass}>
                      {index + 1}. {section.title}
                    </p>
                    {section.content()}
                  </div>

                  <div className="flex gap-6 items-center absolute right-0 top-1/2 transform -translate-y-1/2 ">
                    <Image
                      src={TrashIcon}
                      alt="trash"
                      onClick={() => handleDeleteMissionTemplate(section.id)}
                    />
                    <DraggableIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex gap-3 items-center mt-10 mb-10 cursor-pointer"
            onClick={handleMissionDialog}
          >
            <CirclePlusIcon />
            <p className="text-primary font-normal text-sm">
              {sections.length > 0
                ? "Add more Input"
                : "Select mission template"}
            </p>
          </div>
        </form>
      </div>
      <DashboardModal
        className="w-[420px]"
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal
          onProceed={handleProceedCancel}
          modalTitle="Mission Plan Template"
        />
      </DashboardModal>
      <DashboardModal
        className="min-w-[900px] bg-modal-bg-100"
        open={openMissionModal}
        onOpenChange={handleMissionDialog}
      >
        <MissionPlanTemplateModal onSelect={handleGetMissionPlanTemplates} />
      </DashboardModal>
    </DashboardLayout>
  );
};

export default AddMissionPlanTemplate;
