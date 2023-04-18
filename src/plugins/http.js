import service from "./request";
//Menus
export function getBackmenu(){
    return service({
        method:'get',
        url:'api/Adminmenu/getBackmenu',
    })
};

export function getBackmenuByRole(){
    return service({
        method:'get',
        url:'api/Adminmenu/getBackmenuByRole',
    })
};

export function insertmenus(params){
    return service({
        method:'post',
        url:'api/Adminmenu/insertmenus',
        data:params
    })
};

export function deleteBackmenu(params){
    return service({
        method:'delete',
        url:'api/Adminmenu/deleteBackmenu',
        params
    })
};

export function deletesysticket(params){
    return service({
        method:'delete',
        url:'api/deletesysticket',
        params
    })
};

export function getsysticket(){
    return service({
        method:'get',
        url:'api/getsysticket',
    })
};
export function insertsysticket(params){
    return service({
        method:'post',
        url:'api/insertsysticket',
        data:params
    })
};
//News videos
export function getlatestAll(){
    return service({
        method:'get',
        url:'api/getlatestAll',
    })
};

export function getAllcomment(params){
    return service({
        method:'get',
        url:'api/home/getAllcomment',
        params
    })
};
export function commentThumbDownOrUp(data){
    return service({
        method:'post',
        url:'api/home/commentThumbDownOrUp',
        data
    })
};
export function addcomment(data){
    return service({
        method:'post',
        url:'api/home/addcomment',
        data
    })
};
      

export function getlatestByid(params){
    return service({
        method:'get',
        url:'api/getlatestByid',
        params
    })
};
export function getVideos(){
    return service({
        method:'get',
        url:'api/home/getVideos',
    })
};
export function getVideosByid(params){
    return service({
        method:'get',
        url:'api/home/getVideosByid',
        params,
    })
};
export function InsertOrUpdatelatest(params){
    return service({
        method:'post',
        url:'api/AdminNews/InsertOrUpdatelatest',
        data:params,
    })
};

export function Deletelatest(params){
    return service({
        method:'delete',
        url:'api/AdminNews/Deletelatest',
        params,
    })
};
export function InsertOrUpdateVideo(params){
    return service({
        method:'post',
        url:'api/AdminNews/InsertOrUpdateVideo',
        data:params,
    })
};

export function Deletevideo(params){
    return service({
        method:'delete',
        url:'api/AdminNews/Deletevideo',
        params,
    })
};
export function OssDeleteNewsImg(params){
    return service({
        method:'post',
        url:'api/AdminNews/OssDeleteNewsImg',
        data:params,
    })
};

export function OssuploadNewsImg(formData,config){
    return service({
        method:'post',
        url:'api/AdminNews/OssuploadNewsImg',
        data:formData,
        headers:config.headers
    })
};

// account
export function getBackuser(){
    return service({
        method:'get',
        url:'api/getBackuser',
    })
};
export function getBackuserByDriverEmail(params){
    return service({
        method:'get',
        url:'api/getBackuserByDriverEmail',
        params
    })
};

export function InsertChatInfo(data){
    return service({
        method:'post',
        url:'api/InsertChatInfo',
        data
    })
};
export function getChatInfo(params){
    return service({
        method:'get',
        url:'api/getChatInfo',
        params
    })
};

export function getBackUserInfo(){
    return service({
        method:'get',
        url:'api/getBackUserInfo',
    })
};
export function insertProfileImg(data){
    return service({
        method:'post',
        url:'api/insertProfileImg',
        data
    })
};
export function servelogin(data){
    return service({
        method:'post',
        url:'api/servelogin',
        data,
    })
};

export function InsertOrUpdateBackuser(data){
    return service({
        method:'post',
        url:'api/InsertOrUpdateBackuser',
        data
    })
};

export function DeleteBackuser(params){
    return service({
        method:'delete',
        url:'api/DeleteBackuser',
        params
    })
};
// role
export function getallRoleName(){
    return service({
        method:'get',
        url:'api/getallRoleName',
    })
};

export function InsertOrUpdateBackRole(data){
    return service({
        method:'post',
        url:'api/InsertOrUpdateBackRole',
        data
    })
};



export function DeleteBackRole(params){
    return service({
        method:'delete',
        url:'api/DeleteBackRole',
        params
    })
};

export function getallpermission(){
    return service({
        method:'get',
        url:'api/getallpermission',
    })
};

// ticket
export function GoToPay(data){
    return service({
        method:'post',
        url:'api/ticket/GoToPay',
        data
    })
};

export function InsertUserTicket(data){
    return service({
        method:'post',
        url:'api/ticket/InsertUserTicket',
        data
    })
};

export function getcheapestinfo(){
    return service({
        method:'get',
        url:'api/ticket/getcheapestinfo',
    })
};
export function getsingleticketinfo(params){
    return service({
        method:'get',
        url:'api/ticket/getsingleticketinfo',
        params
    })
};

export function InsertOrUpdateTicketInfo(data){
    return service({
        method:'post',
        url:'api/ticket/InsertOrUpdateTicketInfo',
        data
    })
};

export function DeleteticketInfo(params){
    return service({
        method:'delete',
        url:'api/ticket/DeleteticketInfo',
        params
    })
};


//user
export function login(data){
    return service({
        method:'post',
        url:'api/login',
        data
    })
};

export function getUserInfo(){
    return service({
        method:'get',
        url:'api/getUserInfo',
    })
};

export function getUserFavourite(params){
    return service({
        method:'get',
        url:'api/getUserFavourite',
        params
    })
};

export function Deletefavourite(params){
    return service({
        method:'delete',
        url:'api/Deletefavourite',
        params
    })
};

export function addfavourite(data){
    return service({
        method:'post',
        url:'api/addfavourite',
        data
    })
};

export function changeUserInfo(data){
    return service({
        method:'post',
        url:'api/changeUserInfo',
        data
    })
};

export function changeUserpwd(data){
    return service({
        method:'post',
        url:'api/changeUserpwd',
        data
    })
};

export function VertifyIDCard(data){
    return service({
        method:'post',
        url:'api/VertifyIDCard',
        data
    })
};

export function getEmailinfo(){
    return service({
        method:'get',
        url:'api/getEmailinfo',
    })
};

export function DeleteEmailinfo(params){
    return service({
        method:'delete',
        url:'api/DeleteEmailinfo',
        params
    })
};

export function addServeEmailinfo(data){
    return service({
        method:'post',
        url:'api/addServeEmailinfo',
        data
    })
};

export function getUserTicketInfo(){
    return service({
        method:'get',
        url:'api/getUserTicketInfo',
    })
};

export function Driverapply(data){
    return service({
        method:'post',
        url:'api/Driverapply',
        data
    })
};
export function DriverExitapply(data){
    return service({
        method:'post',
        url:'api/Adminmenu/DriverExitapply',
        data
    })
};
export function DriverEnterapply(data){
    return service({
        method:'post',
        url:'api/Adminmenu/DriverEnterapply',
        data
    })
};
export function InviteDriverapply(data){
    return service({
        method:'post',
        url:'api/Adminmenu/InviteDriverapply',
        data
    })
};

export function updateDriverLicensePoint(data){
    return service({
        method:'post',
        url:'api/updateDriverLicensePoint',
        data
    })
};
export function deletedriverDetailTeam(data){
    return service({
        method:'post',
        url:'api/Adminmenu/deletedriverDetailTeam',
        data
    })
};
export function passedriverDetailTeam(data){
    return service({
        method:'post',
        url:'api/Adminmenu/passedriverDetailTeam',
        data
    })
};

export function Teamapply(data){
    return service({
        method:'post',
        url:'api/Teamapply',
        data
    })
};

//review

export function UpdateReviewInfo(data){
    return service({
        method:'post',
        url:'api/Adminmenu/UpdateReviewInfo',
        data
    })
};

export function getreviewinfo(params){
    return service({
        method:'get',
        url:'api/Adminmenu/getreviewinfo',
        params
    })
};
export function getDriverReviewByID(params){
    return service({
        method:'get',
        url:'api/Adminmenu/getDriverReviewByID',
        params
    })
};
export function getDriverReviewByemail(params){
    return service({
        method:'get',
        url:'api/Adminmenu/getDriverReviewByemail',
        params
    })
};
export function DeleteReview(params){
    return service({
        method:'delete',
        url:'api/Adminmenu/DeleteReview',
        params
    })
};

export function UpdateTeamReview(data){
    return service({
        method:'post',
        url:'api/Adminmenu/UpdateTeamReview',
        data
    })
};

export function getTeamreviewByIdInfo(){
    return service({
        method:'get',
        url:'api/Adminmenu/getTeamreviewByIdInfo',
    })
};
export function getTeamreview(params){
    return service({
        method:'get',
        url:'api/Adminmenu/getTeamreview',
        params
    })
};
export function getTeamreviewById(){
    return service({
        method:'get',
        url:'api/getTeamreviewById',
    })
};


export function DeleteTeamReview(params){
    return service({
        method:'delete',
        url:'api/Adminmenu/DeleteTeamReview',
        params
    })
};
export function DeleteReviewAfterEnter(params){
    return service({
        method:'delete',
        url:'api/Adminmenu/DeleteReviewAfterEnter',
        params
    })
};
export function DeleteDriverAcceptEnter(params){
    return service({
        method:'delete',
        url:'api/Adminmenu/DeleteDriverAcceptEnter',
        params
    })
};

export function addOfflineReview(data){
    return service({
        method:'post',
        url:'api/Adminmenu/addOfflineReview',
        data
    })
};



//order
export function getOrderinfo(){
    return service({
        method:'get',
        url:'api/getOrderinfo',
    })
};

export function DeleteOrderinfo(params){
    return service({
        method:'delete',
        url:'api/DeleteOrderinfo',
        params
    })
};

export function addOrderinfo(data){
    return service({
        method:'post',
        url:'api/addOrderinfo',
        data
    })
};

export function UpdateSysTicket(data){
    return service({
        method:'post',
        url:'api/UpdateSysTicket',
        data
    })
};


export function getExaminfo(){
    return service({
        method:'get',
        url:'api/getExaminfo',
    })
};

// train
export function submitQuestion(data){
    return service({
        method:'post',
        url:'api/submitQuestion',
        data
    })
};
export function getDriverTrain(params){
    return service({
        method:'get',
        url:'api/getDriverTrain',
        params
    })
};
export function getDriverTrainByemail(){
    return service({
        method:'get',
        url:'api/getDriverTrainByemail',
    })
};

export function Deletetrain(params){
    return service({
        method:'delete',
        url:'api/Deletetrain',
        params
    })
};

export function UpdateDriverTrain(data){
    return service({
        method:'post',
        url:'api/UpdateDriverTrain',
        data
    })
};

export function getDriverAchieve(params){
    return service({
        method:'get',
        url:'api/getDriverAchieve',
        params
    })
};
export function getdrivernews(params){
    return service({
        method:'get',
        url:'api/getdrivernews',
        params
    })
};



//driver team 
export function addOrUpdateDriverdetail(data){
    return service({
        method:'post',
        url:'api/addOrUpdateDriverdetail',
        data
    })
};

export function addTeaminfo(data){
    return service({
        method:'post',
        url:'api/addTeaminfo',
        data
    })
};
export function getDriverDetail(params){
    return service({
        method:'get',
        url:'api/getDriverDetail',
        params
    })
};
export function getdriverraceinfo(params){
    return service({
        method:'get',
        url:'api/getdriverraceinfo',
        params
    })
};
export function getdriverqulifyinfo(params){
    return service({
        method:'get',
        url:'api/getdriverqulifyinfo',
        params
    })
};
export function getteampointinfo(params){
    return service({
        method:'get',
        url:'api/getteampointinfo',
        params
    })
};
export function getteamraceinfo(params){
    return service({
        method:'get',
        url:'api/getteamraceinfo',
        params
    })
};


export function addOrUpdateTeamdetail(data){
    return service({
        method:'post',
        url:'api/addOrUpdateTeamdetail',
        data
    })
};

export function TeamExitreview(data){
    return service({
        method:'post',
        url:'api/Adminmenu/TeamExitreview',
        data
    })
};

export function getTeamdetail(params){
    return service({
        method:'get',
        url:'api/getTeamdetail',
        params
    })
};
export function getteamdetailById(params){
    return service({
        method:'get',
        url:'api/teamdetail/getteamdetailById',
        params
    })
};

export function getDriverByTeam(){
    return service({
        method:'get',
        url:'api/getDriverByTeam',
    })
};
export function getScheduleDriver(){
    return service({
        method:'get',
        url:'api/getScheduleDriver',
    })
};

export function InsertDriverSchedule(data){
    return service({
        method:'post',
        url:'api/InsertDriverSchedule',
        data
    })
};


export function getRaceRecordByTeam(){
    return service({
        method:'get',
        url:'api/getRaceRecordByTeam',
    })
};
export function getRaceRecordByDriver(){
    return service({
        method:'get',
        url:'api/getRaceRecordByDriver',
    })
};
export function UploadDriverDetail(data){
    return service({
        method:'post',
        url:'api/Adminmenu/UploadDriverDetail',
        data
    })
};

export function UploadDriverDetails(data){
    return service({
        method:'post',
        url:'api/Adminmenu/UploadDriverDetails',
        data
    })
};

// schedule

export function DeleteScheduleDriver(params){
    return service({
        method:'delete',
        url:'api/DeleteScheduleDriver',
        params
    })
};


export function getcalendar(){
    return service({
        method:'get',
        url:'api/home/getcalendar',
    })
};
export function InsertOruploadschedule(data){
    return service({
        method:'post',
        url:'api/InsertOruploadschedule',
        data
    })
};


export function getscheduleResult(params){
    return service({
        method:'get',
        url:'api/getscheduleResult',
        params
    })
};

export function InsertscheduleResult(data){
    return service({
        method:'post',
        url:'api/InsertscheduleResult',
        data
    })
};




export function Deleteschedule(params){
    return service({
        method:'delete',
        url:'api/Deleteschedule',
        params
    })
};

export function getHightlightVideo(){
    return service({
        method:'get',
        url:'api/home/getHightlightVideo',
    })
};

export function getTopNewsVideo(){
    return service({
        method:'get',
        url:'api/home/getTopNewsVideo',
    })
};
export function getpartnersinfo(){
    return service({
        method:'get',
        url:'api/home/getpartnersinfo',
    })
};
export function getStanding(){
    return service({
        method:'get',
        url:'api/home/getStanding',
    })
};
export function getStandingteam(){
    return service({
        method:'get',
        url:'api/home/getStandingteam',
    })
};
export function getTopVideo(){
    return service({
        method:'get',
        url:'api/home/getTopVideo',
    })
};
export function getdriverAlsoLike(params){
    return service({
        method:'get',
        url:'api/driverdetail/getdriverAlsoLike',
        params
    })
};
export function getdriverSWiper(params){
    return service({
        method:'get',
        url:'api/driverdetail/getdriverSWiper',
        params
    })
};
export function emailValidate(data){
    return service({
        method:'post',
        url:'api/register/emailValidate',
        data
    })
};
export function registerpassword(data){
    return service({
        method:'post',
        url:'api/registerpassword',
        data
    })
};
export function emailcode(data){
    return service({
        method:'post',
        url:'api/emailcode',
        data
    })
};

export function getcode(params){
    return service({
        method:'get',
        url:'api/getcode',
        params
    })
};
//



