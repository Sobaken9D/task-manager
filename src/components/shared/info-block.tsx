import {Title} from "@/components/shared/title.tsx";
import {cn} from "@/lib/utils/cn.ts";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";

interface Props {
  title: string;
  text: string;
  className?: string;

  firstButtonText?: string;
  firstButtonLink?: string;
  firstButtonIsVisible?: boolean;

  secondButtonText?: string;
  secondButtonLink?: string;
  secondButtonIsVisible?: boolean;
}

export const InfoBlock = ({
  className,
  title,
  text,
  firstButtonText = 'Home',
  firstButtonLink = '/',
  firstButtonIsVisible = true,
  secondButtonText = 'Update',
  secondButtonLink = '',
  secondButtonIsVisible = true,
}: Props) => {
  return (
    <div className={cn('flex flex-col max-w-[600px] w-full mx-auto p-6 bg-white rounded-[16px] border border-zinc-100 shadow-sm', className)}>
      <div className="mb-8">
        <Title
          size="lg"
          text={title}
          className="font-extrabold text-3xl mb-3 text-black"
        />
        <p className="text-zinc-500 text-base">{text}</p>
      </div>

      <div className="flex gap-3">
        {firstButtonIsVisible && (
          <Link to={firstButtonLink}>
            <Button className="w-[140px] border-1 p-2 rounded-[12px]">
              <ArrowLeft />
              {firstButtonText}
            </Button>
          </Link>
        )}

        {secondButtonIsVisible && (
          <a href={secondButtonLink}>
            <Button className="w-[140px] border-1 p-2 rounded-[12px]">
              {secondButtonText}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};