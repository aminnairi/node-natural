export const createNaturalOptionParser = (acceptedOptions) => {
  const parse = (providedOptions, parsed = {}, unknown = [], lone = []) => {
    if (providedOptions.length === 0) {
      return [parsed, unknown, lone];
    }

    const [firstProvidedOption, ...remainingProvidedOptions] = providedOptions;
    const foundAcceptedOption = acceptedOptions.find((acceptedOption) => acceptedOption.option === firstProvidedOption);

    if (!foundAcceptedOption) {
      return parse(remainingProvidedOptions, parsed, [...unknown, firstProvidedOption], lone);
    }

    if (foundAcceptedOption.isBoolean) {
      return parse(remainingProvidedOptions, {...parsed, [foundAcceptedOption.name]: true}, unknown, lone);
    }

    const [secondProvidedOption, ...remainingProvidedOptionsAfterSecond] = remainingProvidedOptions;

    if (secondProvidedOption === undefined) {
      return parse(remainingProvidedOptionsAfterSecond, parsed, unknown, [...lone, firstProvidedOption]);
    }

    if (foundAcceptedOption.isMultiple) {
      return parse(remainingProvidedOptionsAfterSecond, {...parsed, [foundAcceptedOption.name]: [...(parsed[foundAcceptedOption.name] ?? []), secondProvidedOption]}, lone);
    }

    return parse(remainingProvidedOptionsAfterSecond, {...parsed, [foundAcceptedOption.name]: secondProvidedOption}, lone);
  };

  return providedOptions => parse(providedOptions);
};
