"use client";

import HomeHeader from "@/components/home/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BasicTab from "@/components/home/tabs/basic-tab";
import AdvancedTab from "@/components/home/tabs/advanced-tab";
import PreviewTab from "@/components/home/tabs/preview-tab";
import { useVideoForm } from "@/hooks/forms/use-video-form";
import { useAtomValue } from "jotai";
import { videoEditAtom } from "@/stores/slices/video_edit_store";
import { useIsMobile } from "@/hooks/global/use-mobile";

const TAB_TRIGGER_CLASSNAME =
  "relative text-sm after:absolute after:bottom-0 after:left-[12px] after:right-[12px] after:h-[3px] data-[state=active]:shadow-none data-[state=active]:after:bg-[rgba(142,71,240,1)] text-base";

export default function Home() {
  const t = useTranslations("home");
  const videoForm = useVideoForm();
  const { generatingScript } = useAtomValue(videoEditAtom);

  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("basicParams");
  useEffect(() => {
    if (!isMobile && activeTab === "videoPreview") {
      setActiveTab("basicParams");
    }
  }, [isMobile, activeTab]);

  return (
    <div className="container mx-auto mt-10 flex h-[calc(100vh-84px)] min-w-[375px] max-w-[1280px] flex-col items-center gap-4 overflow-auto rounded-lg border bg-background p-4 pb-0 shadow-sm">
      <HomeHeader />

      <div className="-mx-4 flex h-full w-full flex-row divide-x overflow-y-auto transition-all duration-300 ease-in-out max-md:mx-0 max-md:flex-col max-md:divide-x-0 max-md:divide-y">
        <div className="h-full w-1/2 overflow-y-auto pb-4 pl-[1px] pr-4 transition-all duration-300 ease-in-out max-md:w-full max-md:px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="basicParams"
          >
            <TabsList className="justify-start gap-[56px] bg-transparent max-md:gap-4">
              <TabsTrigger
                value="basicParams"
                className={TAB_TRIGGER_CLASSNAME}
              >
                {t("tabs.basicParams")}
              </TabsTrigger>
              <TabsTrigger
                value="advancedParams"
                className={TAB_TRIGGER_CLASSNAME}
                disabled={generatingScript}
              >
                {t("tabs.advancedParams")}
              </TabsTrigger>
              {isMobile && (
                <TabsTrigger
                  value="videoPreview"
                  className={TAB_TRIGGER_CLASSNAME}
                  disabled={generatingScript}
                >
                  {t("tabs.videoPreview")}
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="basicParams" className="mt-4 animate-tab-left">
              <BasicTab videoForm={videoForm} />
            </TabsContent>
            <TabsContent
              value="advancedParams"
              className="mt-4 animate-tab-left"
            >
              <AdvancedTab videoForm={videoForm} />
            </TabsContent>
            <TabsContent
              value="videoPreview"
              className="mt-4 animate-tab-left md:hidden"
            >
              <PreviewTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Video Preview Area */}
        <div className="h-full w-1/2 overflow-y-auto pl-4 pr-[1px] max-md:hidden">
          <PreviewTab />
        </div>
      </div>
    </div>
  );
}
