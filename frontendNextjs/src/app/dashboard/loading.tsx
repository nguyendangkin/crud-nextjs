import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
    return (
        <p>
            <Skeleton count={4} />
        </p>
    );
}
