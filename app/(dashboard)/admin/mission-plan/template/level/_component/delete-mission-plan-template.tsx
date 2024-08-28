import { ManceLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { useDeleteMissionPlanTemplateMutation } from "@/redux/services/checklist/missionPlanTemplateApi";
import { toast } from "sonner";

const DeleteMissionPlanTemplate = ({
  data,
  onCancel,
}: {
  data: any;
  onCancel: () => void;
}) => {
  const [deleteMissionPlanTemplate, { isLoading }] =
    useDeleteMissionPlanTemplateMutation();

  const handleDelete = async () => {
    const id = data?.id;
    await deleteMissionPlanTemplate(id)
      .unwrap()
      .then(() => {
        toast.success("Template Deleted Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            onCancel();
          }, 1000);
        });
      });
  };
  console.log(data, "delete");
  return (
    <div className="flex flex-col gap-2 p-3 pb-0 ">
      <p className="text-black font-light text-center">
        Are you sure you <br /> want to delete this{" "}
        <span className="text-primary font-medium ">{`(${data?.name})`}</span>{" "}
        template?
      </p>
      <div className="flex gap-3 items-center justify-end mt-10">
        <Button
          variant={"outline"}
          className={`border-primary text-primary font-light  hover:text-primary `}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          className={` font-light ${
            isLoading
              ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
              : ""
          } `}
          disabled={isLoading}
        >
          {isLoading ? <ManceLoader /> : "Yes, Delete"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteMissionPlanTemplate;
