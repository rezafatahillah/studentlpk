import ILpk from "@itype/courses/ILpk";
import IStudent from "@itype/courses/IStudent";

export default interface IReview {
    id:           number;
    student_id:   number;
    user_comment: string;
    rating:       number;
    rating_time:  Date;
    created_at:   Date;
    course_id:    number;
    admin_reply:  string;
    reply_time:   null;
    student:      IStudent;
    lpk:          ILpk;
}