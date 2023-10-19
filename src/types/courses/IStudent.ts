import IStudentProfile from "@itype/courses/IStudentProfile";

export default interface IStudent {
    firstname:       string;
    lastname:        string;
    student_profile: IStudentProfile;
}