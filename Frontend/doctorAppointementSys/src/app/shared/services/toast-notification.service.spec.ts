import { TestBed, inject } from "@angular/core/testing";

import { ToastNotification } from "./toast-notification.service";

describe("ToastNotification", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastNotification]
    });
  });

  it("should be created", inject(
    [ToastNotification],
    (service: ToastNotification) => {
      expect(service).toBeTruthy();
    }
  ));
});
