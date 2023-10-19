import IReview from "@itype/courses/IReview";
import IRatingDet from "./IRatingDet";

export default interface IRating {
    reviews:      IReview[];
    rating:       number;
    review_count: number;
    sum_rating:   string;
    discount:     number;
    rating_det:   IRatingDet;
}