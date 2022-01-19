export default class BaseResource {
  protected data = undefined;
  protected status = "pending";
  protected error = undefined;
  public promise: Promise<any> | null = null;

  read() {
    switch (this.status) {
      case "pending":
        throw this.promise;
      case "error":
        throw this.error;
      default:
        return this.data;
    }
  }
}