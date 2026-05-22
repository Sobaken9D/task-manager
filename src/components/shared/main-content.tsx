import {cn} from "@/lib/utils.ts";
import {Container} from "@/components/shared/container.tsx";
import {TodoContent} from "@/components/shared/todo/todo-content.tsx";
import {Footer} from "@/components/shared/footer.tsx";
import {Moon} from "lucide-react";

interface Props {
  className?: string;
}

export const MainContent = ({className}: Props) => {
  return (
    <div className={cn('relative', className)}>
      <Container className="flex flex-col justify-between min-h-screen">
        <TodoContent/>
        <Footer/>
      </Container>
      <button className="absolute right-[50px] top-[43px] cursor-pointer">
        <Moon strokeWidth={"2px"} size={"48px"}/>
      </button>
    </div>
  );
}