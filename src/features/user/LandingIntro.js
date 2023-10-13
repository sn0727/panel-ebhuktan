import TemplatePointers from "./components/TemplatePointers"



function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">

          {/* <h1 className='text-3xl text-center font-bold '><img src="/logo02.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />E-BHUKTAN</h1> */}

          <a className="text-center mt-12" href="/login">
            <img src="./logo02.png" alt="Dashwind Admin Template" className="w-48 inline-block" />
          </a>

          {/* Importing pointers component */}
          {/* <TemplatePointers /> */}

        </div>

      </div>
    </div>
  )

}

export default LandingIntro