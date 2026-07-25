import {InfoBlock} from "@/components/shared/info-block.tsx";

export const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access denied"
        text="Only authorized users can view this page"
      />
    </div>
  );
}