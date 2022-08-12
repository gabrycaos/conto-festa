import { useMemo } from "react";
import { useForm } from "react-hook-form";

import "./App.css";

function App() {
  const onSubmit = (data) => console.log(data);

  const PRICES = {
    pasta: 5,
    patatine: 3,
    hotdog: 2.5,
    salsiccia: 3,
    arrosticini: 0.5,
    birraPiccola: 2,
    birraGrande: 3.5,
    birraCaraffa: 10,
    cocaPiccola: 1.5,
    cocaGrande: 2.5,
    vinoPiccolo: 2.5,
    vinoGrande: 3.5,
    vinoCaraffa: 10,
    acqua: 1,
  };

  const LABELS = {
    pasta: "Pasta",
    patatine: "Patatine",
    hotdog: "Hot dog",
    salsiccia: "Salsiccia",
    arrosticini: "Arrosticini",
    birraPiccola: "Birra 0,2 L",
    birraGrande: "Birra 0,4 L",
    birraCaraffa: "Birra 1 L",
    cocaPiccola: "Coca-cola 0,2 L",
    cocaGrande: "Coca-cola 0,4 L",
    vinoPiccolo: "Vino bianco 0,2 L",
    vinoGrande: "Vino bianco 0,4 L",
    vinoCaraffa: "Vino bianco 1 L",
    acqua: "Acqua",
  };

  const defaultValues = {
    pasta: 0,
    patatine: 0,
    hotdog: 0,
    salsiccia: 0,
    arrosticini: 0,
    birraPiccola: 0,
    birraGrande: 0,
    birraCaraffa: 0,
    cocaPiccola: 0,
    cocaGrande: 0,
    vinoPiccolo: 0,
    vinoGrande: 0,
    vinoCaraffa: 0,
    acqua: 0,
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const values = watch();

  console.log(values);

  const price = useMemo(() => {
    const entries = Object.entries(values);
    const final = entries.reduce((acc, curr) => {
      return acc + +curr[1] * PRICES[curr[0]];
    }, 0);
    return final;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="w-screen p-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white">
      <h1 className="text-center text-xl m-4 font-bold">
        Capradosso in festa 2022
      </h1>
      <h3 className="text-center text-md m-4 font-semibold">Conto cena</h3>
      <h2 className="text-center text-lg m-4 font-bold text-5xl">{price} €</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2"
      >
        {Object.keys(PRICES).map((key) => (
          <div className="form-group flex flex-col" key={key}>
            <label htmlFor={key} className="font-bold text-lg">
              {LABELS[key]}
            </label>
            <input
              type="number"
              placeholder={LABELS[key]}
              id={key}
              name={key}
              {...register(key)}
              className="border rounded-xl h-12 text-black text-right font-semibold p-2 input"
              min="0"
            />
          </div>
        ))}

        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        {/* register your input into the hook by invoking the "register" function */}
        {/* <input defaultValue="test" {...register("example")} /> */}

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        {/* <input type="submit" /> */}
      </form>
      <button
        type="button"
        onClick={() => reset()}
        className="w-full h-16 bg-green-400 text-white mt-4 rounded-xl border-4 font-bold"
      >
        RESET
      </button>
    </div>
  );
}

export default App;
