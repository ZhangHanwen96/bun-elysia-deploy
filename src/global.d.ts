import "react";

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // Define custom 'tw' attribute
        tw?: string;
    }
}
