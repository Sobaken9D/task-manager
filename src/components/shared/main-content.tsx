import {cn} from "@/lib/utils.ts";
import {Container} from "@/components/shared/container.tsx";
import {TodoContent} from "@/components/shared/todo/todo-content.tsx";
import {Footer} from "@/components/shared/footer.tsx";

interface Props {
  className?: string;
}

export const MainContent = ({className}: Props) => {
  return (
    <div className={cn('', className)}>
      <Container className="flex flex-col justify-between min-h-screen">
        <TodoContent/>
        <Footer/>
      </Container>
    </div>
  );
}