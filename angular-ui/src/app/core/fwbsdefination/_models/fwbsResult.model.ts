import { FWBSDefinationModel } from "./FWBSDefination.models";

export class FWBSResultModel {
    errorMessage: string;
    result: FWBSDefinationModel[];
    statusCode: number;
    success: boolean;
    timestamp: string;
    version: string;

}