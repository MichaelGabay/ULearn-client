export const time_ago = (time) => {
    time = Number(time)
    switch (typeof time) {
        case "number":
            break;
        case "string":
            time = +new Date(time);
            break;
        case "object":
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    let time_formats = [
        [60, "שניות", 1], // 60
        [120, "לפני דקה 1", "בעוד דקה"], // 60*2
        [3600, "דקות", 60], // 60*60, 60
        [7200, "לפני שעה אחת", "בעוד שעה"], // 60*60*2
        [86400, "שעות", 3600], // 60*60*24, 60*60
        [172800, "אתמול", "מחר"], // 60*60*24*2
        [604800, "ימים", 86400], // 60*60*24*7, 60*60*24
        [1209600, "לפני שבוע", "שבוע הבא"], // 60*60*24*7*4*2
        [2419200, "שבועות", 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, "לפני חודש", "חודש הבא"], // 60*60*24*7*4*2
        [29030400, "חודשים", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, "לפני שנה", "שנה הבאה"], // 60*60*24*7*4*12*2
        [2903040000, "שנים", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, "המאה הקודמת", "במאה הבאה"], // 60*60*24*7*4*12*100*2
        [58060800000, "מאות", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = "לפני",
        list_choice = 1;

    if (Math.floor(seconds) === 0) {
        return "ברגע זה";
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = "בעוד";
        list_choice = 2;
    }
    let i = 0,
        format;
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == "string") return format[list_choice];
            else {
                return token + " " + Math.floor(seconds / format[2]) + " " + format[1];
            }
        }
    return time;
};