
import * as proxy from '../../server/proxy/index';
import { IResp } from '../../types';

const handler = async (_req, res) => {
  let resp: IResp;
  try{
    const data = await proxy.getProfile();
    resp = {
      status: 200,
      data
    }
    return res.status(200).send(resp);
  }catch (error) {
    resp = {
      status: 400,
      message: error.message
    };
    return res.status(500).send(resp);
  }
};

export default handler;