
import * as proxy from '../../server/proxy/index';
import { IResp } from '../../types';

const handler = async (req, res) => {
  let resp: IResp;
  try{
    const categories = await proxy.getPosts(req.query);
    resp = {
      status: 200,
      data: categories
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