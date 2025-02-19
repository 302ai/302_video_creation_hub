import { env } from "@/env";
import githubMark from "@/public/svgs/github-mark.svg";
import githubMarkWhite from "@/public/svgs/github-mark-white.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/global/use-theme";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useIsHideBrand } from "@/hooks/global/use-is-hide-brand";

export function GithubHyperlink() {
  const t = useTranslations();

  const githubRepoUrl = env.NEXT_PUBLIC_GITHUB_REPO_URL;

  const { theme } = useTheme();

  const isHidingBrand = useIsHideBrand();

  return (
    <a
      href={githubRepoUrl}
      target="_blank"
      className={cn(githubRepoUrl && !isHidingBrand ? "block" : "hidden")}
    >
      <Button
        variant="icon"
        size="roundIconSm"
        aria-label={t("global.header.github_hyperlink.label")}
      >
        <Image
          className="size-4"
          src={theme === "dark" ? githubMarkWhite : githubMark}
          alt="GitHub"
          width={16}
          height={16}
        />
      </Button>
    </a>
  );
}
