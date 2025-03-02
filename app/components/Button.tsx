import React, { ReactNode } from "react";

import { Button as RadixButton } from "@radix-ui/themes";

const Button = (children: string | ReactNode) => {
  return <RadixButton className="w-30">{children}</RadixButton>;
};

export default Button;
