import { Progress } from "@/components/ui/progress"

export const LoadingWrapper = ({ isLoading, isError, children, data }) => {
    if (isLoading) return <Progress value={33} color="primary" />;

    if (isError) return <div className="text-red-500 text-center py-6"> Error {isError?.message}; </div>

    if (data) return children;
};