import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "@/store/hooks.ts";
import {cn} from "@/lib/utils/cn.ts";
import {
  FilterCategoryButton
} from "@/components/shared/todo/filter-category-button.tsx";

interface Props {
  className?: string;
}

export const TasksFilters = ({className}: Props) => {
  const {items} = useAppSelector(state => state.todo);
  const tasksLeft = items.length;

  const [searchParams, setSearchParams] = useSearchParams();



  const currentFilter = searchParams.get("filter") || "all";

  const handleFilterChange = (value: string) => {
    setSearchParams({filter: value});
  };

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