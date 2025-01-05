export type IMessage = {
  uid: string;
  text: string;
};

export type IExportMessage = {
  me: {
    uid: string;
  };
  message: IMessage;
};
