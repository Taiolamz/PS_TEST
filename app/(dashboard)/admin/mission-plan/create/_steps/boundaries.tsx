import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MissionDetailPreview from "./preview";

const Boundaries = () => {
  const router = useRouter();
  const location = usePathname();
  const step = useSearchParams().get("step");
  return (
    <>
      {step !== "preview" && (
        <div>
          <h1>Freedom & Constraint</h1>
          <Button
            className="border"
            type="button"
            onClick={() =>
              router.push(`${location}?ui=boundaries&step=preview`)
            }
          >
            Save & Continue
          </Button>
        </div>
      )}
      {step === "preview" && <MissionDetailPreview />}
    </>
  );
};

export default Boundaries;
