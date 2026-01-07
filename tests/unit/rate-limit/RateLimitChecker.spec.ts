import { RateLimitChecker } from "../../../src/rate-limit/RateLimitChecker";
import { RateLimitExceededError } from "../../../src/rate-limit/errors";
import { InMemoryRateLimitRepository } from "../../helpers/InMemoryRateLimitRepository";

describe("RateLimitChecker", () => {
    it("should allow requests until the limit is reached", async () => {
        const repository = new InMemoryRateLimitRepository();
        const checker = new RateLimitChecker(repository);

        const policy = {
            maxRequests: 3,
            windowInSeconds: 60,
        }

        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
    })

    it("should throw an error when the limit is exceeded", async () => {
        const repository = new InMemoryRateLimitRepository();
        const checker = new RateLimitChecker(repository);

        const policy = {
            maxRequests: 3,
            windowInSeconds: 60,
        }

        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
        await expect(checker.check(policy, "user1")).resolves.not.toThrow();
        await expect(checker.check(policy, "user1")).rejects.toThrow(RateLimitExceededError);
    })
})