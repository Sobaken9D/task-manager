import {cn} from "@/lib/utils.ts";

import selfieImage from "@/assets/selfie.png";

interface Props {
  className?: string;
}

export const TasksPlaceholder = ({className}: Props) => {
  return (
    <div className={cn("flex relative w-full h-[500px]", className)}>
      <img
        className="absolute top-0 left-[-190px]"
        src={selfieImage as string}
        alt="selfie"
      />
      <p className="absolute top-[50%] translate-y-[-50%] right-0 text-[24px] italic">
        Empty as my motivation on Monday <span className="not-italic">😅</span>. <br />
        Let’s start adding stuff!
      </p>
    </div>
  );
}