import * as nodeMailer from "nodemailer";
import * as mailtrap from "mailtrap";
import { getEnvironmentVariables } from "../environments/environment";

export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport({
      // host: getEnvironmentVariables().host,
      // port: getEnvironmentVariables().port,
      // auth:{
      //   user:getEnvironmentVariables().auth.user,
      //   pass:getEnvironmentVariables().auth.pass,
      // },
        
     //Using gmail verification 
    service: 'gmail',
    auth:{
        user:getEnvironmentVariables().gmail_auth.user,
        pass:getEnvironmentVariables().gmail_auth.pass,
    }

    });
  }

  static sendMail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initiateTransport().sendMail({
    from: getEnvironmentVariables().gmail_auth.user,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
