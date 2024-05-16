import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NDBjMjQ4OC05ZTVlLTRkODktOTk4ZC04ODMwYWZhMDc5YTYiLCJpYXQiOjE3MTU3NTEyMzUsImV4cCI6MTcxNTc4NzIzNX0.4RLOCwvkruG3-Y5-T4Zp-s_ixgZbQ3CnSB_yArAMLp4";

const baseUrl = "http://192.168.8.198:8082/api";

export const getCampaignContents = async (data?: string) => {
  try {
    const resp = await axios.post(
      `${baseUrl}/v2/campaign`,
      {
        htmlContent: JSON.stringify(data) || "<div>a</div>",
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw { status: error?.status, message: error?.message };
  }
};
export const downloadScripts = async () => {
  try {
    const resp = await axios.get(`${baseUrl}/v1/campaign/download`, {
      headers: {
        authorization: "Bearer " + token,
      },
      responseType: "blob",
    });
    return resp.data;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw { status: error?.status, message: error?.message };
  }
};

export const generateScripts = async (campaignId: string) => {
  try {
    const resp = await axios.get(
      `${baseUrl}/v1/campaign/scripts/${campaignId}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw { status: error?.status, message: error?.message };
  }
};

export const getCampaignPageById = async (id?: string) => {
  try {
    const resp = await axios.get(`${baseUrl}/v1/campaign/pages/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return resp.data.data;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw { status: error?.status, message: error?.message };
  }
};

export const getCampaignPageCTRByPageId = async (id?: string) => {
  try {
    const resp = await axios.get(`${baseUrl}/v1/campaign/ctr/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return resp.data.data;
  } catch (error: any) {
    // eslint-disable-next-line no-throw-literal
    throw { status: error?.status, message: error?.message };
  }
};
