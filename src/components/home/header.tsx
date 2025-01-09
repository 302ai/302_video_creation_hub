import AppLogo from "@/components/global/app-logo";
import { useIsHideBrand } from "@/hooks/global/use-is-hide-brand";
import { useTranslations } from "next-intl";

export default function HomeHeader() {
  const t = useTranslations();
  const isHideBrand = useIsHideBrand();
  return (
    <div className="flex items-center justify-center gap-2">
      {!isHideBrand && <AppLogo size="mini" height={32} width={32} />}
      <h1 className="text-2xl font-bold">{t("home.header.title")}</h1>
    </div>
  );
}
