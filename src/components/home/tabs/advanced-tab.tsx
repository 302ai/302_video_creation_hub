import AdvancedTabForm from "@/components/forms/tabs/advanced-tab-form";
import { UseVideoFormReturn } from "@/hooks/forms/use-video-form";

interface AdvancedTabProps {
  videoForm: UseVideoFormReturn;
}

export default function AdvancedTab({ videoForm }: AdvancedTabProps) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center">
      <AdvancedTabForm videoForm={videoForm} />
    </div>
  );
}
