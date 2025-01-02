import BasicTabForm from "@/components/forms/tabs/basic-tab-form";
import { UseVideoFormReturn } from "@/hooks/forms/use-video-form";

interface BasicTabProps {
  videoForm: UseVideoFormReturn;
}

export default function BasicTab({ videoForm }: BasicTabProps) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center">
      <BasicTabForm videoForm={videoForm} />
    </div>
  );
}
