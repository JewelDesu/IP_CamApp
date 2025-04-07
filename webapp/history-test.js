(async function testSubmit() {
    const values = {
      dateTime: new Date("2025-04-04T10:30:00"), //irasoma tiksli data
    };
  
    const formatDate = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
  
    const formatFileDate = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
    };
  
    const startTime = encodeURIComponent(formatDate(values.dateTime));
    const endTime = encodeURIComponent(formatDate(new Date(values.dateTime.getTime() + 2 * 60 * 1000)));
    const fileTime = encodeURIComponent(formatFileDate(values.dateTime));
    const reqTime = `video-${fileTime}`;
  
    const ipaddr = "192.168.0.140"; //irasomas kameros ip adresas
  
    try {
      const response = await fetch(`/api/sqlitepost?vidName=${reqTime}`, {
        method: "PUT",
      });
  
      if (response.ok) {
        console.log("Timestamp has been found");
        console.log("Video will be uploaded shortly");
      } else {
        console.error("Error:", await response.text());
      }
  
      fetch(`/api/proxy?videoIp=${ipaddr}&startTime=${startTime}&endTime=${endTime}&fileTime=${fileTime}`);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  })();