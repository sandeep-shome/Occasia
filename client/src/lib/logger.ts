const logger = (data: any, isDev: boolean = true) => {
  if (isDev) {
    process.env.NODE_ENV === "development" && console.log(data);
  } else {
    console.log(data);
  }
};

export default logger;
