import {cn} from "@/lib/utils.ts";
import {
  FilterCategoryButton
} from "@/components/shared/todo/filter-category-button.tsx";
import {useSearchParams} from "react-router-dom";

interface Props {
  className?: string;
}

export const TasksFilters = ({className}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("filter") || "all";

  const handleFilterChange = (value: string) => {
    setSearchParams({filter: value});
  };

  const tasksLeft = 2;

  return (
    <div className={cn("flex justify-between text-inactive-filter text-[20px]", className)}>
      <div>
        <FilterCategoryButton
          onClick={() => handleFilterChange("all")}
          text="All"
          isActive={currentFilter === 'all'}
        />
        <span> | </span>
        <FilterCategoryButton
          onClick={() => handleFilterChange("active")}
          text="Active"
          isActive={currentFilter === "active"}
        />
        <span> | </span>
        <FilterCategoryButton
          onClick={() => handleFilterChange("completed")}
          text="Completed"
          isActive={currentFilter === "completed"}
        />
      </div>
      <div>
        {tasksLeft} tasks left
      </div>
    </div>
  );
}