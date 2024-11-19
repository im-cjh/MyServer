import { create } from "@bufbuild/protobuf";
import { ErrorData, ErrorDataSchema } from "src/protocol/struct_pb";


export class ResponseUtils {
  static createErrorResponse(responseCode: number, message: string): ErrorData {
    const ret: ErrorData = create(ErrorDataSchema, {
      responseCode: responseCode,
      message,
    });

    return ret;
  }
}
