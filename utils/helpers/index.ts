export const timeToMinuteSecond =  (time: number) => `${Math.floor(time / 60)}:${('0' + (time % 60)).slice(-2)}`

export const maskEmail = (email: string) => {
    return email.substring(0,3) + "*****" + "." + email.split("@")[1].split(".")[1]
  }