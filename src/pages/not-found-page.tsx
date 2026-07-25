import {InfoBlock} from "@/components/shared/info-block.tsx";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Page not found (404)"
        text="The page you are looking for doesn't exist or has been moved"
      />
    </div>
  );
}