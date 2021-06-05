const tools = {
  setCookie(name, value, day = 0) {
    const oDate = new Date();
    oDate.setTime(oDate.getTime() + (day * 24 * 60 * 60 * 1000));
    const oDay = oDate.toGMTString();
    if (day > 0) {
      document.cookie = name + "=" + value + "; expires=" + oDay + ";path=/";
    } else {
      document.cookie = name + "=" + value + ";path=/";
    }
  },
  removeCookie(name) {
    const oDay = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const cookie = document.cookie;
    const index = cookie.indexOf(name) + 1;
    if (index) {
      let arr1 = cookie.split("; ");
      for (let i = 0; i < arr1.length; i++) {
        let arr2 = arr1[i].split("=");
        if (arr2[0] == name) {
          document.cookie = arr2[0] + "=" + ";expires=" + oDay + ";path=/";
        }
      }
    }
  },
  getCookie(name) {
    const cookie = document.cookie;
    const index = cookie.indexOf(name) + 1;
    if (index) {
      let arr1 = cookie.split("; ");
      for (let i = 0; i < arr1.length; i++) {
        let arr2 = arr1[i].split("=");
        if (arr2[0] == name) {
          return arr2[1];
        }
      }
    } else {
      return "";
    }
  },
  test(string = 'aaa') {
    return string
  },
  encrypt(password) {
    return 'fsadfa' + password + 'olijah'
  },
  confirmPassword(pd1, pd2) {
    if (pd1 === pd2) {
      return true
    } else {
      return false
    }
  },
  confirmEmail(email) {
    const result = email.search(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    return result > -1 ? true : false
  }
}

export default tools