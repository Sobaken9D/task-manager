import {Moon} from "lucide-react";
import {Container} from "@/components/shared/container.tsx";
import {cn} from "@/lib/utils/cn.ts";
import {TodoContent} from "@/components/shared/todo/todo-content.tsx";
import {Footer} from "@/components/shared/footer.tsx";
import {ThemeToggler} from "@/components/shared/theme-toggler.tsx";

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

      <ThemeToggler className="absolute right-[50px] top-[43px]"/>
    </div>
  );
}