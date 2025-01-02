"use client";

import HomeHeader from "@/components/home/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createScopedLogger } from "@/utils/logger";
import BasicTab from "@/components/home/tabs/basic-tab";
import AdvancedTab from "@/components/home/tabs/advanced-tab";
import PreviewTab from "@/components/home/tabs/preview-tab";
import { useVideoForm } from "@/hooks/forms/use-video-form";
import { useAtomValue } from "jotai";
import { videoEditAtom } from "@/stores/slices/video_edit_store";

const logger = createScopedLogger("Home");

export default function Home() {
  const t = useTranslations("home");
  const videoForm = useVideoForm();
  const { generatingScript } = useAtomValue(videoEditAtom);

  useEffect(() => {
    logger.info("Hello, Welcome to 302.AI");
  }, []);

  return (
    <div className="container relative mx-auto mt-10 flex h-[calc(100vh-84px)] min-w-[375px] flex-1 flex-col items-center gap-4 overflow-auto rounded-lg border bg-background p-4 pb-0 shadow-sm lg:max-w-[1280px]">
      <HomeHeader />

      {/* Two-column layout */}
      <div className="flex h-full w-full divide-x overflow-y-auto">
        <div className="w-1/2 overflow-y-auto pb-4 pl-[1px] pr-4">
          <Tabs defaultValue="basicParams">
            <TabsList className="justify-start gap-[56px] bg-transparent">
              <TabsTrigger
                value="basicParams"
                className="relative text-base after:absolute after:bottom-0 after:left-[12px] after:right-[12px] after:h-[3px] data-[state=active]:shadow-none data-[state=active]:after:bg-[rgba(142,71,240,1)]"
              >
                {t("tabs.basicParams")}
              </TabsTrigger>
              <TabsTrigger
                value="advancedParams"
                className="relative text-base after:absolute after:bottom-0 after:left-[12px] after:right-[12px] after:h-[3px] data-[state=active]:shadow-none data-[state=active]:after:bg-[rgba(142,71,240,1)]"
                disabled={generatingScript}
              >
                {t("tabs.advancedParams")}
              </TabsTrigger>
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
          </Tabs>
        </div>

        {/* Video Preview Area */}
        <div className="w-1/2 overflow-y-auto pb-4 pl-4 pr-[1px]">
          <PreviewTab />
        </div>
      </div>
    </div>
  );
}
