export type IMessage = {
  name: string;
  text: string;
};

export type IExportMessage = {
  me: {
    name: string;
  };
  message: IMessage;
};
